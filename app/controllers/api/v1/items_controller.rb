class Api::V1::ItemsController < Api::V1::BaseController
  def index
    items = []
    5.times.each do
      break if items.size >= 5
      items.push(
          id: Faker::IDNumber.south_african_id_number.to_i,
          name: Faker::Restaurant.name,
          price: Faker::Number.decimal(l_digits: 3, r_digits: 2)
      )
    end

    total_amount = items.inject(0){|sum,x| sum+x[:price]}.round(2)
    render json: { data: items, total_amount: total_amount }
  end
end
